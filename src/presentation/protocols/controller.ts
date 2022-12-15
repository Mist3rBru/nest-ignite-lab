export abstract class IController {
  abstract handle(body: any): Promise<Record<string, any>> | Promise<void>
}
