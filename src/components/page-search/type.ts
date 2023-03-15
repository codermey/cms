export interface ISearchConfig {
  pageName: string
  formItems: IFormItem[]
}

interface IFormItem {
  type: string
  label: string
  prop: string
  placeholder?: string
  options?: any[]
}
