<script setup lang="ts">
import { reactive, ref, toRefs, watch } from 'vue'
import { ElMessage } from 'element-plus'
import useMainStore from '@/store/main/main'
import type { ImodalConfig } from './type'

interface IModalProps {
  modalConfig: ImodalConfig
  menuList?: number[]
}

// props
const props = defineProps<IModalProps>()
const { pageName, header, formItems } = toRefs(reactive(props.modalConfig))
const dialogVisible = ref(false)

// 表单数据
const formData = reactive<any>({})
for (const item of formItems.value) {
  formData[item.prop] = ''
}

/* 定义设置dialogVisible方法 */
// 1.是否新建
const isNew = ref(true)
// 2.编辑用户的ID
const editUserId = ref<number>(0)
// 3.modal展示数据处理
function setModalVisible(New = true, formItem?: any) {
  isNew.value = New
  dialogVisible.value = true
  if (!New && formItem) {
    // 编辑
    for (const key in formData) {
      formData[key] = formItem[key]
    }
    editUserId.value = formItem.id
  } else {
    // 新建
    for (const key in formData) {
      formData[key] = ''
    }
  }
}

watch(
  () => props.menuList,
  (newValue) => {
    if (props.menuList) formData.menuList = newValue
  }
)

// 消息弹框
function elMessageFn(res: any) {
  if (res.code === 0) dialogVisible.value = false
  ElMessage({
    message: res.data,
    type: res.code === 0 ? 'success' : 'error'
  })
}
// 点击确认按钮，网络请求处理
const mainStore = useMainStore()
const confimClick = () => {
  if (isNew.value) {
    mainStore.new(pageName.value, formData).then((res) => {
      elMessageFn(res)
    })
  } else {
    mainStore.edit(pageName.value, editUserId.value, formData).then((res) => {
      elMessageFn(res)
    })
  }
}

defineExpose({
  setModalVisible
})
</script>

<template>
  <div class="page-modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isNew ? header.new : header.edit"
      width="30%"
      center
    >
      <el-form :model="formData" size="large" label-width="80">
        <template v-for="item in formItems" :key="item.prop">
          <el-form-item
            :label="item.label"
            :prop="item.prop"
            v-if="item.prop !== 'password' || isNew"
          >
            <template v-if="item.type === 'select'">
              <el-select
                v-model="formData[item.prop]"
                :placeholder="item.placeholder"
                style="width: 100%"
              >
                <template v-for="i in item.options" :key="i.id">
                  <el-option :label="i.name" :value="i.id" />
                </template>
              </el-select>
            </template>
            <template v-else-if="item.type === 'custom'">
              <slot :name="item.slotName"></slot>
            </template>
            <template v-else>
              <el-input v-model="formData[item.prop]" :placeholder="item.placeholder" />
            </template>
          </el-form-item>
        </template>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button size="large" @click="dialogVisible = false"> 取消 </el-button>
          <el-button type="primary" size="large" @click="confimClick"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="less" scoped>
.page-modal {
  .el-form {
    padding: 20px 20px 0;
  }
}
</style>
