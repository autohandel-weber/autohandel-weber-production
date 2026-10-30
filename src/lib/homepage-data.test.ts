import { describe, expect, it } from "vitest";
import { selectHomepageCars } from "./homepage-data";

describe("homepage vehicle selection", () => {
  it("shows only four vehicles from a larger stock", () => {
    expect(selectHomepageCars([1, 2, 3, 4, 5, 6]).visible).toEqual([1, 2, 3, 4]);
  });
  it("counts further AutoScout24 vehicles after the four shown", () => {
    expect(selectHomepageCars(Array.from({ length: 13 }, (_, i) => i)).remaining).toBe(9);
  });
  it("does not invent further vehicles for a smaller stock", () => {
    expect(selectHomepageCars([1, 2]).remaining).toBe(0);
  });
});