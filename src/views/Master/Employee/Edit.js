import { FormItem, Input, FormContainer, Select, Switcher } from 'components/ui'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
// import { PostName, PutName } from 'services/MasterService'
import { useSelector } from 'react-redux'
import React, { forwardRef } from 'react'
import { PutEmployee, PostEmployee } from 'services/Master/Employee'

const validationSchema = Yup.object().shape({
    Name: Yup.string()
        .min(1, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Name Required'),
    DesignationId: Yup.string().required('Designation Required'),
    DepartmentId: Yup.string().required('Department Required'),
    MobileNo: Yup.string()
        .min(1, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Mobile No Required'),
    Email: Yup.string()
        .min(1, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Email Required'),
})
const colourOptions = [
    { value: 'ocean', label: 'Ocean', color: '#00B8D9' },
    { value: 'blue', label: 'Blue', color: '#0052CC' },
    { value: 'purple', label: 'Purple', color: '#5243AA' },
    { value: 'red', label: 'Red', color: '#FF5630' },
    { value: 'orange', label: 'Orange', color: '#FF8B00' },
    { value: 'yellow', label: 'Yellow', color: '#FFC400' },
    { value: 'green', label: 'Green', color: '#36B37E' },
    { value: 'forest', label: 'Forest', color: '#00875A' },
    { value: 'slate', label: 'Slate', color: '#253858' },
    { value: 'silver', label: 'Silver', color: '#666666' },
]
const Edit = forwardRef((props, ref) => {
    const {
        onDrawerClose,
        setdata,
        data,
        setMessage,
        setlog,
        designation,
        department,
    } = props
    const token = useSelector((state) => state.auth.session.token)
    const EditData = useSelector((state) => state.base.common.editData)

    const AddEmployee = async (values, token) => {
        try {
            const resp = await PostEmployee(values, token)

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
    const EditEmployee = async (values, token) => {
        console.log(values)
        try {
            const resp = await PutEmployee(values, token)
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
                    Remark: EditData.Remark || '',
                    DesignationId: EditData.UserDesignation?.Id || '',
                    DepartmentId: EditData.Department?.Id || '',
                    MobileNo: EditData.MobileNo || '',
                    CompanyId: EditData.CompanyId || 0,
                    Code: EditData.Code || '',
                    Email: EditData.Email || '',
                    Status: 1,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm, setSubmitting }) => {
                    console.log(values)
                    setTimeout(() => {
                        if (!EditData.Id) {
                            new Promise((resolve, reject) => {
                                AddEmployee(values, token)
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
                                EditEmployee(values, token)
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
                                    label="Email"
                                    invalid={errors.Email && touched.Email}
                                    errorMessage={errors.Email}
                                >
                                    <Field
                                        size="sm"
                                        type="email"
                                        maxLength="20"
                                        autoComplete="off"
                                        name="Email"
                                        placeholder="Email"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem
                                    asterisk
                                    label="Designation"
                                    invalid={
                                        errors.DesignationId &&
                                        touched.DesignationId
                                    }
                                    errorMessage={errors.DesignationId}
                                >
                                    <Field name="DesignationId">
                                        {({ field, form }) => (
                                            <Select
                                                size="sm"
                                                field={field}
                                                form={form}
                                                options={designation}
                                                value={designation.filter(
                                                    (option) =>
                                                        option.value ===
                                                        values.DesignationId
                                                )}
                                                onChange={(option) =>
                                                    form.setFieldValue(
                                                        field.name,
                                                        option?.value
                                                    )
                                                }
                                            />
                                        )}
                                    </Field>
                                </FormItem>
                                <FormItem
                                    asterisk
                                    label="Department"
                                    invalid={
                                        errors.DepartmentId &&
                                        touched.DepartmentId
                                    }
                                    errorMessage={errors.DepartmentId}
                                >
                                    <Field name="DepartmentId">
                                        {({ field, form }) => (
                                            <Select
                                                size="sm"
                                                field={field}
                                                form={form}
                                                options={department}
                                                value={department.filter(
                                                    (option) =>
                                                        option.value ===
                                                        values.DepartmentId
                                                )}
                                                onChange={(option) =>
                                                    form.setFieldValue(
                                                        field.name,
                                                        option?.value
                                                    )
                                                }
                                            />
                                        )}
                                    </Field>
                                </FormItem>

                                <FormItem
                                    asterisk
                                    label="MobileNo"
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
                                    label="Code"
                                    invalid={errors.Code && touched.Code}
                                    errorMessage={errors.Code}
                                >
                                    <Field
                                        size="sm"
                                        type="text"
                                        maxLength="20"
                                        autoComplete="off"
                                        name="Code"
                                        placeholder="Code"
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
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
})
export default Edit
