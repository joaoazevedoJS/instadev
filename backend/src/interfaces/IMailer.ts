export interface IMailerhandlebarsOptions {
  viewEngine: {
    partialsDir: string,
    defaultLayout: undefined | string,
  }
  viewPath: string
  extName: string
}

export interface IMailProps {
  to: string
  from: string
  template: string
  context: object
}
