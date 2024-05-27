import CryptoJS from 'crypto-js/crypto-js'

// 默认的 KEY 与 iv 如果没有给
const KEY = CryptoJS.enc.Utf8.parse('1234567890123456')
const IV = CryptoJS.enc.Utf8.parse('1234567890123456')
const AES = ['41', '45', '53'] // 十六进制表示
const encrypt = ['65', '6e', '63', '72', '79', '70', '74']
const decrypt = ['64', '65', '63', '72', '79', '70', '74']
/**
 * AES加密 ：字符串 key iv  返回base64
 */
export function Encrypt(word, keyStr) {
  let key = KEY
  const iv = IV

  if (keyStr) {
    key = CryptoJS.enc.Utf8.parse(keyStr)
  }

  const srcs = CryptoJS.enc.Utf8.parse(word)
  const encrypted = CryptoJS[hexToStr(AES)][hexToStr(encrypt)](srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding,
  })
  // console.log("-=-=-=-", encrypted.ciphertext)
  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext)
}
/**
 * AES 解密 ：字符串 key iv  返回base64
 *
 */
export function Decrypt(word, keyStr, ivStr) {
  let key = KEY
  let iv = IV

  if (keyStr) {
    key = CryptoJS.enc.Utf8.parse(keyStr)
    iv = CryptoJS.enc.Utf8.parse(ivStr)
  }

  const base64 = CryptoJS.enc.Base64.parse(word)
  const src = CryptoJS.enc.Base64.stringify(base64)

  const dec = CryptoJS[hexToStr(AES)][hexToStr(decrypt)](src, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding,
  })

  const decryptedStr = dec.toString(CryptoJS.enc.Utf8)
  return decryptedStr.toString()
}

/**
 * 字符串转十六进制数组
 */
export function strToHexArr(str) {
  const arr = []
  for (let i = 0; i < str.length; i++) {
    arr[i] = str.charCodeAt(i).toString(16)
  }
  return arr
}

/**
 * 十六进制数组转字符串
 */
export function hexToStr(arr) {
  let str = ''
  for (let i = 0; i < arr.length; i++) {
    str += String.fromCharCode(parseInt(arr[i], 16))
  }
  return str
}

/**
 * AES加密 ：字符串 key iv  返回base64
 */
export function EncryptPkcs7(word, keyStr) {
  let key = KEY
  const iv = IV

  if (keyStr) {
    key = CryptoJS.enc.Utf8.parse(keyStr)
  }

  const srcs = CryptoJS.enc.Utf8.parse(word)
  const encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  })
  // console.log("-=-=-=-", encrypted.ciphertext)
  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext)
}
