import useLoginStore from '@/store/login/login'

function usePermissions(permissionID: string) {
  const loginStore = useLoginStore()
  return !!loginStore.permissions.find((item) => item.includes(permissionID))
}

export default usePermissions
