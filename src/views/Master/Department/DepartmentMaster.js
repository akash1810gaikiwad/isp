import { Alert, Button, Card, Drawer } from 'components/ui'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import TableShow from 'views/Component/TableShow'
import Edit from './Edit'
import { DrawerFooter } from 'views/Component/Header'
import { HiFire } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { setEditData, setShowbox } from 'store/base/commonSlice'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { apiGetdepartment } from 'services/Master/Department'
import { ActionColumn } from 'views/Component/EditButton'
import { getdepartment, getdesignation } from 'views/DropApiFunaction.js'

const DepartmentMaster = () => {
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
            {
                header: 'Department Incharge',
                accessorKey: 'DepartmentIncharge',
            },
            { header: 'Mobile', accessorKey: 'MobileNo' },
            {
                header: 'Address',
                accessorKey: 'Address',
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
            const resp = await apiGetdepartment()

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
    console.log(isOpen)

    return (
        <div>
            {message ? (
                <Alert showIcon type={log} customIcon={<HiFire />}>
                    {message}
                </Alert>
            ) : null}

            <Card>
                {isOpen ? (
                    <>
                        <h4>Department Master</h4>
                        <br />
                        <Edit
                            ref={formikRef}
                            onDrawerClose={onDrawerClose}
                            setdata={setdata}
                            data={data}
                            setMessage={setMessage}
                            setlog={setlog}
                            designation={designation}
                            department={department}
                            onSaveClick={formSubmit}
                            onCancel={onDrawerClose}
                        />
                    </>
                ) : (
                    <TableShow
                        data={data}
                        columns={columns}
                        name={'Department'}
                        header="Department Master"
                    />
                )}
            </Card>
        </div>
    )
}

export default DepartmentMaster
