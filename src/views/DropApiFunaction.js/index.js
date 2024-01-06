import {
    apiGetdepartmentDrop,
    apiGetdesignationDrop,
} from 'services/DropApi/Index'

export const getdesignation = async (setdesignation, setlog, setMessage) => {
    try {
        const resp = await apiGetdesignationDrop()

        if (resp.status == 200) {
            const formattedOptions = resp.data.map((option) => ({
                value: option.Id,
                label: option.Designation,
            }))
            setdesignation(formattedOptions)
            return
        }
    } catch (errors) {
        if (errors.response.status == 500) {
            setlog('error')
            setMessage('Server Error')
            return
        }
    }
}

export const getdepartment = async (setdepartment, setlog, setMessage) => {
    try {
        const resp = await apiGetdepartmentDrop()

        if (resp.status == 200) {
            const formattedOptions = resp.data.map((option) => ({
                value: option.Id,
                label: option.Name,
            }))
            setdepartment(formattedOptions)
            return
        }
    } catch (errors) {
        if (errors.response.status == 500) {
            setlog('error')
            setMessage('Server Error')
            return
        }
    }
}
