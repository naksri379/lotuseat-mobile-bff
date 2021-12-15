import Log from '../../utilities/logger'

export const ExecuteTimeLog = (): MethodDecorator => {
  const log = new Log()
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value
    descriptor.value = async function (...args: any[]) {
      const startTime = new Date()

      log.generateLogTemplate(`Start execute ${propertyKey} method`)
      const result = await originalMethod.apply(this, args)
      const endTime = new Date().getTime() - startTime.getTime()
      log.generateLogTemplate(`${propertyKey} executed in ${endTime} ms`)
      return result
    }

    return descriptor
  }
}
