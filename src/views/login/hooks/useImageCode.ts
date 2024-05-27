import { onMounted, ref } from "vue";
import {
  getVerifyId,
  getVerifyCode
} from "@/api/user";
export function useImageCode() {
  const imageCodeSrc = ref('');
  const verifyId = ref(0);
  async function getVerifyIdCode() {
    verifyId.value = (await getVerifyId()).data
    const res = await getVerifyCode({ operName: 'NETS_LOGIN', id: verifyId.value })
    imageCodeSrc.value = window.URL.createObjectURL(res)
  }
  onMounted(()=>getVerifyIdCode())
  return { verifyId, imageCodeSrc, getVerifyIdCode };
}
