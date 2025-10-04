import { promises as fs } from "fs";
import path from "path";

import { NextResponse } from "next/server";
import { z } from "zod";

import {
  DailyPlanDay,
  DailyPlanResponse,
  dailyPlanDaySchema,
  dailyPlanItemSchema,
  dailyPlanResponseSchema,
  dailyPlanTaskSchema
} from "@/features/dashboard/types";
import { mockDailyPlan } from "@/features/dashboard/data/sample";

const DAILY_PLAN_PATH = path.join(process.cwd(), "data", "daily-plan.json");

function cloneMockDays(): DailyPlanDay[] {
  return JSON.parse(JSON.stringify(mockDailyPlan));
}

async function ensureFileExists() {
  await fs.mkdir(path.dirname(DAILY_PLAN_PATH), { recursive: true });
  await fs.writeFile(
    DAILY_PLAN_PATH,
    JSON.stringify({ days: cloneMockDays() }, null, 2),
    "utf8"
  );
}

async function readDailyPlanFile(): Promise<DailyPlanResponse> {
  try {
    const file = await fs.readFile(DAILY_PLAN_PATH, "utf8");
    if (!file) {
      return { days: cloneMockDays() };
    }

    const parsed = dailyPlanResponseSchema.safeParse(JSON.parse(file));
    if (!parsed.success) {
      console.error("Invalid daily plan JSON", parsed.error.flatten());
      return { days: cloneMockDays() };
    }

    return parsed.data;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      await ensureFileExists();
      return { days: cloneMockDays() };
    }

    console.error("Failed to read daily plan file", error);
    return { days: cloneMockDays() };
  }
}

async function writeDailyPlanFile(payload: DailyPlanResponse) {
  await fs.writeFile(DAILY_PLAN_PATH, JSON.stringify(payload, null, 2), "utf8");
}

export async function GET() {
  const data = await readDailyPlanFile();
  return NextResponse.json(data);
}

const updateTaskSchema = z.object({
  dayId: z.string(),
  itemId: z.string(),
  taskId: z.string(),
  completed: z.boolean()
});

export async function PATCH(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = updateTaskSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid payload", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { dayId, itemId, taskId, completed } = parsed.data;
  const current = await readDailyPlanFile();

  const targetDay = current.days.find((day) => day.id === dayId);
  if (!targetDay) {
    return NextResponse.json({ error: "Daily plan day not found" }, { status: 404 });
  }

  if (targetDay.locked) {
    return NextResponse.json({ error: "Day is locked" }, { status: 423 });
  }

  const targetItem = targetDay.items.find((item) => item.id === itemId);
  if (!targetItem) {
    return NextResponse.json({ error: "Daily plan item not found" }, { status: 404 });
  }

  const targetTask = targetItem.tasks.find((task) => task.id === taskId);
  if (!targetTask) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }

  const nextDays = current.days.map((day) => {
    if (day.id !== dayId) {
      return day;
    }

    const parsedDay = dailyPlanDaySchema.parse(day);
    const nextItems = parsedDay.items.map((item) => {
      if (item.id !== itemId) {
        return item;
      }

      const parsedItem = dailyPlanItemSchema.parse(item);
      const nextTasks = parsedItem.tasks.map((task) => {
        if (task.id !== taskId) {
          return task;
        }

        const parsedTask = dailyPlanTaskSchema.parse(task);
        return { ...parsedTask, completed };
      });

      const hasChanges = JSON.stringify(nextTasks) !== JSON.stringify(parsedItem.tasks);

      return {
        ...parsedItem,
        tasks: nextTasks,
        updatedAt: hasChanges ? new Date().toISOString() : parsedItem.updatedAt
      };
    });

    return {
      ...parsedDay,
      items: nextItems
    };
  });

  const sorted = [...nextDays].sort((a, b) => a.sequence - b.sequence);
  let previousCompleted = true;

  const recalculatedDays = sorted.map((day, index) => {
    const parsedDay = dailyPlanDaySchema.parse(day);
    const dayCompleted = parsedDay.items.every((item) =>
      item.tasks.every((task) => task.completed)
    );

    const locked = index === 0 ? false : !previousCompleted;
    previousCompleted = previousCompleted && dayCompleted;

    return {
      ...parsedDay,
      completed: dayCompleted,
      locked
    };
  });

  const finalDays = nextDays.map((day) => {
    const updated = recalculatedDays.find((d) => d.id === day.id);
    return updated ?? day;
  });

  const updatedResponse = dailyPlanResponseSchema.parse({ days: finalDays });
  await writeDailyPlanFile(updatedResponse);

  return NextResponse.json(updatedResponse);
}
