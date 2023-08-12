import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useRecordStore = defineStore('record', () => {
  const info = ref({
    is_record: false,
    a_step: "",
    b_step: "",
    record_loser: "",
  })

  return { info }
})
