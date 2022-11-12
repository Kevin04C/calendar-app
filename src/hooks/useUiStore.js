import { useDispatch, useSelector } from "react-redux"
import { onCloseDateModal, onOpenDateModal } from "../store/ui/uiSlice";


export const useUiStore = () => {

  const dispatch = useDispatch();
  const { isDateModalOpen } = useSelector(state => state.ui);
  

  const openModal = () => {
    dispatch(onOpenDateModal());
  }

  const closeModal = () => {
    dispatch(onCloseDateModal())
  }

  return {
    //PROPIEDADES
    isDateModalOpen,

    //MÉTODOS
    openModal,
    closeModal
  }

}