import type { IContentConfig } from '@/components/page-content/type'

const contentConfig: IContentConfig = {
  pageName: 'users',
  header: {
    title: '用户列表',
    btnText: '新建用户'
  },
  tableList: [
    { type: 'selection', width: '55', label: '选择' },
    { type: 'index', label: '#', width: '50' },
    { type: 'nomarl', prop: 'name', label: '用户名', width: '140' },
    { type: 'nomarl', prop: 'realname', label: '真实姓名', width: '120' },
    { type: 'nomarl', prop: 'cellphone', label: '手机号码', width: '150' },
    {
      type: 'custom',
      prop: 'enable',
      label: '状态',
      width: '80',
      slotName: 'enable'
    },
    {
      type: 'timer',
      prop: 'createAt',
      label: '创建时间',
      slotName: 'createAt'
    },
    {
      type: 'timer',
      prop: 'updateAt',
      label: '更新时间',
      slotName: 'updateAt'
    },
    {
      type: 'handle',
      label: '操作',
      width: '130',
      slotName: 'handle'
    }
  ]
}

export default contentConfig
