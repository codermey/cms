<script setup lang="ts">
import { reactive, ref, toRefs, computed } from 'vue'
import type { FormInstance } from 'element-plus'
import type { ISearchConfig } from './type'

interface ISearchProps {
  searchConfig: ISearchConfig
}

const props = defineProps<ISearchProps>()
const { formItems } = toRefs(reactive(props.searchConfig))
const emit = defineEmits(['queryClick', 'refreshClick'])

const searchForm = reactive<any>({})
for (const item of formItems.value) {
  searchForm[item.prop] = ''
}

const newSearchForm = computed(() => {
  const searchFormData: any = {}
  for (const key in searchForm) {
    if (searchForm[key] !== '') {
      searchFormData[key] = searchForm[key]
    }
  }
  return searchFormData
})

// 查询
const queryClick = () => {
  emit('queryClick', newSearchForm.value)
}
// 重置
const searchFormRef = ref<FormInstance>()
const refreshClick = () => {
  searchFormRef.value?.resetFields()
  emit('refreshClick')
}
</script>

<template>
  <div class="page-search">
    <el-card class="search">
      <el-form :model="searchForm" ref="searchFormRef" label-width="80px" size="large">
        <el-row :gutter="20">
          <template v-for="item in formItems" :key="item.prop">
            <el-col :span="8">
              <el-form-item :label="item.label" :prop="item.prop">
                <template v-if="item.type === 'input'">
                  <el-input
                    v-model="searchForm[item.prop]"
                    :placeholder="item.placeholder"
                  />
                </template>
                <template v-else-if="item.type === 'select'">
                  <el-select
                    v-model="searchForm[item.prop]"
                    :placeholder="item.placeholder"
                    style="width: 100%"
                  >
                    <template v-for="i in item.options" :key="i.value">
                      <el-option :label="i.label" :value="i.value" />
                    </template>
                  </el-select>
                </template>
                <template v-else-if="item.type === 'date-picker'">
                  <el-date-picker
                    v-model="searchForm[item.prop]"
                    type="daterange"
                    unlink-panels
                    range-separator="-"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                  />
                </template>
              </el-form-item>
            </el-col>
          </template>
        </el-row>
      </el-form>
      <div class="btns">
        <el-button type="primary" icon="Search" size="large" @click="queryClick">
          查询
        </el-button>
        <el-button icon="Refresh" size="large" @click="refreshClick"> 重置 </el-button>
      </div>
    </el-card>
  </div>
</template>

<style lang="less" scoped>
.page-search {
  .el-form-item {
    padding: 10px 35px;
  }
  .btns {
    padding-right: 35px;
    text-align: right;
  }
}
</style>
