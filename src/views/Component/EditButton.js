import { HiOutlinePencil } from 'react-icons/hi'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setEditData, setShowbox } from 'store/base/commonSlice'
import useThemeClass from 'utils/hooks/useThemeClass'

export const ActionColumn = ({ row }) => {
    const dispatch = useDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onEdit = () => {
        dispatch(setEditData(row))

        dispatch(setShowbox(true))
    }

    return (
        <span
            className={`cursor-pointer p-2 hover:${textTheme}`}
            onClick={() => onEdit()}
        >
            <HiOutlinePencil />
        </span>
    )
}
