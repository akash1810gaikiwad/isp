import { FormItem, Input, FormContainer, Select, Switcher } from 'components/ui'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
// import { PostName, PutName } from 'services/MasterService'
import { useSelector } from 'react-redux'
import React, { forwardRef } from 'react'
import { Putdepartment, Postdepartment } from 'services/Master/Department'
import { StickyCardFooter } from 'views/Component/Header'

const validationSchema = Yup.object().shape({
    Name: Yup.string()
        .min(1, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Name Required'),
    MobileNo: Yup.string()
        .min(1, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Mobile No Required'),
    Address: Yup.string()
        .min(1, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Address Required'),
    DepartmentIncharge: Yup.string()
        .min(1, 'Too Short!')
        .max(50, 'Too Long!')
        .required('DepartmentIncharge Required'),
})

const Edit = forwardRef((props, ref) => {
    const {
        onDrawerClose,
        setdata,
        data,
        setMessage,
        setlog,
        onSaveClick,
        onCancel,
    } = props
    const token = useSelector((state) => state.auth.session.token)
    const EditData = useSelector((state) => state.base.common.editData)

    const Adddepartment = async (values, token) => {
        try {
            const resp = await Postdepartment(values, token)

            if (resp.status == 200) {
                setlog('success')
                onDrawerClose()
                setdata([resp.data, ...data])
                setMessage('Data Inserted Successfully')
                return
            }
        } catch (errors) {
            if (errors.response.status == 500) {
                setlog('error')
                onDrawerClose()
                setMessage('Server Error')
                return
            }
            if (errors.response.status == 404) {
                setlog('info')
                onDrawerClose()
                setMessage('Data Already Exits')
                return
            }
        }
    }
    const Editdepartment = async (values, token) => {
        console.log(values)
        try {
            const resp = await Putdepartment(values, token)
            setdata(
                data.map((item) =>
                    item.Id === resp.data.Id ? resp.data : item
                )
            )

            if (resp.status == 200) {
                setlog('success')
                onDrawerClose()
                setMessage('Data Updated Successfully')
            }
        } catch (errors) {
            if (errors.response.status == 500) {
                setlog('error')
                onDrawerClose()
                setMessage('Server Error')
                return
            }
            if (errors.response.status == 404) {
                setlog('info')
                onDrawerClose()
                setMessage('Data Already Exits')
                return
            }
        }
    }

    return (
        <div>
            <Formik
                innerRef={ref}
                initialValues={{
                    Id: EditData.Id || '',
                    Name: EditData.Name || '',
                    Remark: EditData.Remark || ' ',
                    MobileNo: EditData.MobileNo || '',
                    Address: EditData.Address || 0,
                    DepartmentIncharge: EditData.DepartmentIncharge || '',
                    Phone: EditData.Phone || '0',
                    Status: 1,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm, setSubmitting }) => {
                    console.log(values)
                    setTimeout(() => {
                        if (!EditData.Id) {
                            new Promise((resolve, reject) => {
                                Adddepartment(values, token)
                                    .then((response) => {
                                        resolve(response)
                                    })
                                    .catch((errors) => {
                                        reject(errors)
                                    })
                            })
                        } else {
                            new Promise((resolve, reject) => {
                                setSubmitting(false)
                                Editdepartment(values, token)
                                    .then((response) => {
                                        resolve(response)
                                    })
                                    .catch((errors) => {
                                        reject(errors)
                                    })
                            })
                        }

                        resetForm()
                    }, 400)
                }}
            >
                {({ values, touched, errors }) => (
                    <Form>
                        <FormContainer>
                            <Field
                                size="sm"
                                type="Id"
                                autoComplete="off"
                                name="Id"
                                placeholder="Id name"
                                component={Input}
                                hidden
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <FormItem
                                    asterisk
                                    label="Name"
                                    invalid={errors.Name && touched.Name}
                                    errorMessage={errors.Name}
                                >
                                    <Field
                                        size="sm"
                                        type="text"
                                        maxLength="20"
                                        autoComplete="off"
                                        name="Name"
                                        placeholder="Name"
                                        component={Input}
                                    />
                                </FormItem>

                                <FormItem
                                    asterisk
                                    label="Department Incharge"
                                    invalid={
                                        errors.DepartmentIncharge &&
                                        touched.DepartmentIncharge
                                    }
                                    errorMessage={errors.DepartmentIncharge}
                                >
                                    <Field
                                        size="sm"
                                        type="text"
                                        maxLength="20"
                                        autoComplete="off"
                                        name="DepartmentIncharge"
                                        placeholder="DepartmentIncharge"
                                        component={Input}
                                    />
                                </FormItem>

                                <FormItem
                                    asterisk
                                    label="Mobile No"
                                    invalid={
                                        errors.MobileNo && touched.MobileNo
                                    }
                                    errorMessage={errors.MobileNo}
                                >
                                    <Field
                                        size="sm"
                                        type="text"
                                        maxLength="20"
                                        autoComplete="off"
                                        name="MobileNo"
                                        placeholder="MobileNo"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem
                                    asterisk
                                    label="Address"
                                    invalid={errors.Address && touched.Address}
                                    errorMessage={errors.Address}
                                >
                                    <Field
                                        size="sm"
                                        type="text"
                                        maxLength="20"
                                        autoComplete="off"
                                        name="Address"
                                        placeholder="Address"
                                        component={Input}
                                    />
                                </FormItem>

                                <FormItem
                                    asterisk
                                    label="Status"
                                    invalid={errors.Status && touched.Status}
                                    errorMessage={errors.Status}
                                >
                                    <Field
                                        size="sm"
                                        type="text"
                                        maxLength="20"
                                        autoComplete="off"
                                        name="Status"
                                        placeholder="Status"
                                        component={Switcher}
                                    />
                                </FormItem>
                            </div>

                            {/* <FormItem>
                                <Button variant="solid" type="submit">
                                    Submit
                                </Button>
                            </FormItem> */}
                            <StickyCardFooter
                                onSaveClick={onSaveClick}
                                onCancel={onCancel}
                            />
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
})
export default Edit
