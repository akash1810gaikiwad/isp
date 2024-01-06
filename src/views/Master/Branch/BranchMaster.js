import { Alert, Button, Card, Drawer } from 'components/ui'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import TableShow from 'views/Component/TableShow'
import Edit from './Edit'
import { DrawerFooter } from 'views/Component/Header'
import { HiFire } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { setEditData, setShowbox } from 'store/base/commonSlice'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { apiGetbranch } from 'services/Master/Branch'
import { ActionColumn } from 'views/Component/EditButton'

const BranchMaster = () => {
    const formikRef = useRef()
    const dispatch = useDispatch()
    const formSubmit = () => {
        formikRef.current?.submitForm()
    }

    const [message, setMessage] = useTimeOutMessage()
    const [log, setlog] = useState('')
    const [data, setdata] = useState([])

    const isOpen = useSelector((state) => state.base.common.showbox)
    const onDrawerClose = () => {
        dispatch(setEditData([]))
        dispatch(setShowbox(false))
    }

    const columns = useMemo(
        () => [
            { header: 'Name', accessorKey: 'Name' },
            { header: 'Address', accessorKey: 'Address' },
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
    }, [])

    const getdata = async () => {
        const res = await apiGetbranch()
        setdata(res.data)
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
                    name={'MSO'}
                    header="Branch Master"
                />

                <Drawer
                    title="Branch Master"
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
                    />
                </Drawer>
            </Card>
        </div>
    )
}

export default BranchMaster
