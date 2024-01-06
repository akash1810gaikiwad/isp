import { Button } from 'components/ui'
import { AiOutlineSave } from 'react-icons/ai'
import { StickyFooter } from 'components/shared'
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

export const StickyCardFooter = ({
    onSaveClick,
    onCancel,
    BtnSaveTxt = 'Save',
    BtnCancelTxt = 'Discard',
}) => {
    return (
        <StickyFooter
            className="-mx-8 px-8 flex items-center justify-between py-4"
            stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
        >
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
        </StickyFooter>
    )
}
