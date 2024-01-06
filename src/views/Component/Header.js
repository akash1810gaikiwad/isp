import { Button } from 'components/ui'
import { AiOutlineSave } from 'react-icons/ai'
import { HiOutlineViewGridAdd } from 'react-icons/hi'
import { useDispatch } from 'react-redux'
import { setShowbox } from 'store/base/commonSlice'

export const DrawerFooter = ({
    onSaveClick,
    onCancel,
    BtnSaveTxt = 'Save',
    BtnCancelTxt = 'Discard',
}) => {
    return (
        <div className="text-left w-full">
            <Button size="sm" className="mr-2" onClick={onCancel}>
                {BtnCancelTxt}
            </Button>

            <Button
                size="sm"
                className="mr-2"
                variant="solid"
                onClick={onSaveClick}
                icon={<AiOutlineSave />}
            >
                {BtnSaveTxt}
            </Button>
        </div>
    )
}
