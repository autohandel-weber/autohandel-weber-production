export const HOME_CAR_LIMIT = 4;

export function selectHomepageCars<T>(cars: readonly T[]) {
  return { visible: cars.slice(0, HOME_CAR_LIMIT), remaining: Math.max(0, cars.length - HOME_CAR_LIMIT) };
}