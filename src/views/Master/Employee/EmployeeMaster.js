import { Alert, Button, Card, Drawer } from 'components/ui'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import TableShow from 'views/Component/TableShow'
import Edit from './Edit'
import { DrawerFooter } from 'views/Component/Header'
import { HiFire } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { setEditData, setShowbox } from 'store/base/commonSlice'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { apiGetemployee } from 'services/Master/Employee'
import { ActionColumn } from 'views/Component/EditButton'
import { getdepartment, getdesignation } from 'views/DropApiFunaction.js'

const EmployeeMaster = () => {
    const formikRef = useRef()
    const dispatch = useDispatch()
    const formSubmit = () => {
        formikRef.current?.submitForm()
    }

    const [message, setMessage] = useTimeOutMessage()
    const [log, setlog] = useState('')
    const [data, setdata] = useState([])
    const [designation, setdesignation] = useState([])
    const [department, setdepartment] = useState([])
    const isOpen = useSelector((state) => state.base.common.showbox)

    const onDrawerClose = () => {
        dispatch(setEditData([]))
        dispatch(setShowbox(false))
    }

    const columns = useMemo(
        () => [
            { header: 'Name', accessorKey: 'Name' },
            { header: 'Email', accessorKey: 'Email' },
            { header: 'Mobile', accessorKey: 'MobileNo' },
            {
                header: 'Designation',
                accessorKey: 'UserDesignation.Designation',
            },
            {
                header: 'Department',
                accessorKey: 'Department.Name',
            },
            {
                header: '',
                id: 'action',
                cell: (props) => <ActionColumn row={props.row.original} />,
            },
        ],
        []
    )

    useEffect(() => {
        getdata()
        getdesignation(setdesignation, setMessage, setlog)
        getdepartment(setdepartment, setMessage, setlog)
    }, [])

    const getdata = async () => {
        try {
            const resp = await apiGetemployee()

            if (resp.status == 200) {
                setdata(resp.data)
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

    return (
        <div>
            {message ? (
                <Alert showIcon type={log} customIcon={<HiFire />}>
                    {message}
                </Alert>
            ) : null}

            <Card>
                <TableShow
                    data={data}
                    columns={columns}
                    name={'Employee'}
                    header="Employee Master"
                />

                <Drawer
                    title="Employee Master"
                    isOpen={isOpen}
                    onClose={onDrawerClose}
                    footer={
                        <DrawerFooter
                            onCancel={onDrawerClose}
                            onSaveClick={formSubmit}
                        />
                    }
                >
                    <Edit
                        ref={formikRef}
                        onDrawerClose={onDrawerClose}
                        setdata={setdata}
                        data={data}
                        setMessage={setMessage}
                        setlog={setlog}
                        designation={designation}
                        department={department}
                    />
                </Drawer>
            </Card>
        </div>
    )
}

export default EmployeeMaster
