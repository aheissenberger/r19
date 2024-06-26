"use server"

// Artificial delay to simulate a heavier computation
const throttle = (result: any, ms: number) =>
  new Promise<any>(resolve => setTimeout(() => resolve(result), ms))

let counter = 0
export const add = () => {
  counter += 1 // Increment a local state
  return throttle(counter, Math.random() * 1000)
}

export const signup = async (_: {}, form: FormData) =>
  throttle({ email: `${form.get("email")}@${form.get("password")}` }, Math.random() * 1000)
