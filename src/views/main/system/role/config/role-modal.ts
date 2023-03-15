import type { ImodalConfig } from '@/components/page-modal/type'

const modalConfig: ImodalConfig = {
  pageName: 'role',
  header: {
    new: '新建角色',
    edit: '编辑角色'
  },
  formItems: [
    {
      type: 'input',
      label: '角色名称',
      prop: 'name',
      placeholder: '请输入角色名称'
    },
    {
      type: 'input',
      label: '权限介绍',
      prop: 'intro',
      placeholder: '请输入权限介绍'
    },
    {
      type: 'custom',
      prop: 'menuList',
      slotName: 'menulist'
    }
  ]
}

export default modalConfig
