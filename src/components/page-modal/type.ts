export interface ImodalConfig {
  pageName: string
  header: {
    new: string
    edit: string
  }
  formItems: IFormItem[]
}

interface IFormItem {
  type: string
  label?: string
  prop: string
  placeholder?: string
  slotName?: string
  options?: any[]
}
