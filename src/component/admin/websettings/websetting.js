import React, { useState, useRef, useEffect } from 'react'
import { Form, FormGroup } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useProductContext } from '../../common/api/provider';
import { websetting } from '../../../schemas';
import swal from 'sweetalert';
import { Onerrorimg } from '../../common/onerrorimg';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import { websiteServices } from '../../../services/websiteServices';
import { useDispatch } from 'react-redux';
import { updateColor } from '../../../redux/action';



const quillModules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['clean']
    ],
};

const quillFormats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
];


export const Websetting = ({ mode = 'edit' }) => {
    const { companyId, LocationId, apiGetWebSettingsDetail, AddEditWebSettings } = useProductContext(); //data recive from useContext
    const [isLoading, setIsLoading] = useState(false);
    const [websettings, setWebsettings] = useState([]);
    const inputFileRefLogo = useRef(null);
    const inputFileRefBanner = useRef(null);

    const dispatch = useDispatch();

    // initial values for data
    const initialValues = {
        companyId: companyId,
        LocationId: LocationId,
        webSettingId: websetting ? websetting.webSettingId : 0,
        webSiteName: websetting ? websetting.webSiteName : '',
        webSiteDescription: websetting ? websetting.webSiteDescription : '',
        primaryColor: websetting ? websetting.primaryColor : '',
        secondaryColor: websetting ? websetting.secondaryColor : '',
        bannerText: websetting ? websetting.bannerText : '',
        contentBannerText: websetting ? websetting.contentBannerText : '',
        companyAddress: websetting ? websetting.companyAddress : '',
        companyEmail: websetting ? websetting.companyEmail : '',
        companyPhone: websetting ? websetting.companyPhone : '',
        imageResponseDTOs: websetting ? websetting.imageResponseDTOs : []
    };

    // Get data from API
    useEffect(() => {
        const GetWebSettingsDetail = async () => {
            try {
                const response = await websiteServices.WebSettingsDetail(apiGetWebSettingsDetail);
                if (response.isSuccess) {
                    const Records = response.data; // Get the last four records
                    setWebsettings(Records);
                } else {
                    console.error('API request failed:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        GetWebSettingsDetail();
    }, [apiGetWebSettingsDetail]);

    // data send to API
    const { values, errors, handleBlur, touched, handleChange, handleSubmit, setValues, setFieldValue } = useFormik({
        initialValues,
        validationSchema: websetting,
        onSubmit: async (values, action) => {
            setIsLoading(true);
            try {
                const response = await websiteServices.AddEditWebSettings(AddEditWebSettings, values);
                if (response) {
                    setIsLoading(false);
                    dispatch(updateColor({ primaryColor: values.primaryColor, secondaryColor: values.secondaryColor }));
                    swal("Success", `${mode === 'add' ? 'Web Settings added' : 'Web Settings updated'} successfully`, "success");
                    // // Fetch updated product data after adding
                    // const updatedData = await websiteServices.WebSettingsDetail(apiGetWebSettingsDetail);
                    // if (updatedData.isSuccess) {
                    //     setWebsettings(updatedData.data.reverse());
                    // } else {
                    //     console.error('API request failed:', updatedData.message);
                    // }
                } else {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
            } catch (error) {
                console.error('Error:', error);
                swal("Oops!", `Failed to ${mode === 'add' ? 'add' : 'update'} Web Settings`, "error");
                setIsLoading(false);
            }
            console.log(values)
            action.resetForm();
        }
    });

    // Update the form values when 'selectedCategory' changes
    useEffect(() => {
        if (mode === 'edit' && websettings) {
            setValues({
                ...values,
                webSettingId: websettings.webSettingId,
                webSiteName: websettings.webSiteName,
                webSiteDescription: websettings.webSiteDescription,
                primaryColor: websettings.primaryColor,
                secondaryColor: websettings.secondaryColor,
                bannerText: websettings.bannerText,
                contentBannerText: websettings.contentBannerText,
                companyAddress: websettings.companyAddress,
                companyEmail: websettings.companyEmail,
                companyPhone: websettings.companyPhone,
                imageResponseDTOs: websettings.imageResponseDTOs
            });
        }
    }, [mode, websettings, setValues]);


    // handle Image change
    const handleImageChange = (e, inputRef) => {
        const files = e.target.files;
        const updatedImages = [...values.imageResponseDTOs];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result.split(',')[1];
                // Check if an image with the same name already exists
                const existingImage = updatedImages.find(image => image.imageName === file.name);
                if (!existingImage) {
                    // If the image doesn't exist, add it to the array
                    updatedImages.push({
                        imageId: 1,
                        imageName: file.name,
                        imageType: inputRef === inputFileRefLogo ? "logo" : "contentimage",
                        imageData: base64String,
                        isPrimary: true,
                    });
                    // Update the Formik field with the new array of images
                    setFieldValue('imageResponseDTOs', updatedImages);
                } else {
                    swal("Oops!", "Image already exists", "error");
                    console.log('Image already exists:', file.name);
                }

                // Reset the input file value
                inputRef.current.value = ''
            };
            reader.readAsDataURL(file);
        }
    };

    // Inside your component where you define your functions
    const handleImageDelete = (index) => {
        const updatedImages = [...values.imageResponseDTOs];
        updatedImages.splice(index, 1);
        setFieldValue('imageResponseDTOs', updatedImages);
    };

    return (
        <>
            <div className="row bg-white py-3">
                <div className="col-md-6">
                    <h4 className='c-secondarycolor'>Web Settings</h4>
                </div>
                <div className='col-md-12'>
                    <Form onSubmit={handleSubmit}>
                        <div className='row'>
                            <div className='col-md-9'>
                                <div className='row'>
                                    <h6 className='c-primarycolor'>Main Setting</h6>
                                    <div className='col-md-6 mb-3'>
                                        <Form.Group>
                                            <Form.Label>Website Name<span className='text-danger'>*</span></Form.Label>
                                            <Form.Control
                                                placeholder="Enter Website Name"
                                                type="text"
                                                name='webSiteName'
                                                value={values.webSiteName}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </Form.Group>
                                        {errors.webSiteName && touched.webSiteName ? <span className='text-danger mt-2 d-block'>{errors.webSiteName}</span> : null}
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <Form.Group>
                                            <Form.Label>Website Description <span className='text-danger'>*</span></Form.Label>
                                            <Form.Control
                                                placeholder="Enter Website Name"
                                                type="text"
                                                name='webSiteDescription'
                                                value={values.webSiteDescription}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </Form.Group>
                                        {errors.webSiteDescription && touched.webSiteDescription ? <span className='text-danger mt-2 d-block'>{errors.webSiteDescription}</span> : null}
                                    </div>
                                    <h6 className='c-primarycolor'>Banner Setting</h6>
                                    <div className="col-12 mb-3">
                                        <Form.Group>
                                            <Form.Label>Hero Banner Text <span className='text-danger'>*</span></Form.Label>
                                            <ReactQuill
                                                value={values.bannerText}
                                                onChange={(content) => setFieldValue('bannerText', content)}
                                                modules={quillModules}
                                                formats={quillFormats}
                                                placeholder="Enter Banner Text..."
                                            />
                                        </Form.Group>
                                        {errors.bannerText && touched.bannerText ? <span className='text-danger mt-2 d-block'>{errors.bannerText}</span> : null}
                                    </div>
                                    <h6 className='c-primarycolor'>Content Banner Setting</h6>
                                    <div className='col-md-12 mb-3'>
                                        <Form.Group>
                                            <Form.Label>Content Banner Text <span className='text-danger'>*</span></Form.Label>
                                            <Form.Control
                                                placeholder="Banner Text"
                                                type="text"
                                                name='contentBannerText'
                                                value={values.contentBannerText}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </Form.Group>
                                        {errors.contentBannerText && touched.contentBannerText ? <span className='text-danger mt-2 d-block'>{errors.contentBannerText}</span> : null}
                                    </div>
                                    <h6 className='c-primarycolor'>ContactUs Setting</h6>
                                    <div className='col-12 col-md-4 mb-3'>
                                        <Form.Group>
                                            <Form.Label>CompanyAddress <span className='text-danger'>*</span></Form.Label>
                                            <Form.Control
                                                placeholder="Enter Company Address"
                                                type="text"
                                                name='companyAddress'
                                                value={values.companyAddress}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </Form.Group>
                                        {errors.companyAddress && touched.companyAddress ? <span className='text-danger mt-2 d-block'>{errors.companyAddress}</span> : null}
                                    </div>
                                    <div className='col-12 col-md-4 mb-3'>
                                        <Form.Group>
                                            <Form.Label>Company Email <span className='text-danger'>*</span></Form.Label>
                                            <Form.Control
                                                placeholder="Enter Company Email"
                                                type="email"
                                                name='companyEmail'
                                                value={values.companyEmail}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </Form.Group>
                                        {errors.companyEmail && touched.companyEmail ? <span className='text-danger mt-2 d-block'>{errors.companyEmail}</span> : null}
                                    </div>
                                    <div className='col-12 col-md-4 mb-3'>
                                        <Form.Group>
                                            <Form.Label>Phone Number <span className='text-danger'>*</span></Form.Label>
                                            <Form.Control
                                                placeholder="Enter Phone Number"
                                                type="number"
                                                name='companyPhone'
                                                value={values.companyPhone}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </Form.Group>
                                        {errors.companyPhone && touched.companyPhone ? <span className='text-danger mt-2 d-block'>{errors.companyPhone}</span> : null}
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-3 bg-light rounded p-3'>
                                <h6 className='mb-3'>Theme Colors</h6>
                                <div className='mb-2'>
                                    <Form.Group>
                                        <Form.Label>Enter primary color here <span className='text-danger'>*</span></Form.Label>
                                        <Form.Control
                                            type='text'
                                            name='primaryColor'
                                            className='w-100'
                                            placeholder='#adcb1d'
                                            value={values.primaryColor}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </Form.Group>
                                    {errors.primaryColor && touched.primaryColor ? <span className='text-danger mt-2 d-block'>{errors.primaryColor}</span> : null}
                                </div>
                                <div>
                                    <Form.Group>
                                        <Form.Label>Enter Secondary color here <span className='text-danger'>*</span></Form.Label>
                                        <Form.Control
                                            type='text'
                                            name='secondaryColor'
                                            className='w-100'
                                            placeholder='#4C7746'
                                            value={values.secondaryColor}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </Form.Group>
                                    {errors.secondaryColor && touched.secondaryColor ? <span className='text-danger mt-2 d-block'>{errors.secondaryColor}</span> : null}
                                </div>
                                <div className='row'>
                                    <h6>Media</h6>
                                    <div className="col-md-12 imgdiv mb-3">
                                        <Form.Group>
                                            <Form.Label>Website Logo<span className='text-danger'>*</span></Form.Label>
                                            <Form.Control
                                                type="file"
                                                accept="image/*"
                                                id="upload_input_logo"
                                                className="d-none"
                                                ref={inputFileRefLogo}
                                                onChange={(e) => handleImageChange(e, inputFileRefLogo)}
                                            />
                                        </Form.Group>
                                        <div className="d-flex flex-wrap">
                                            {values.imageResponseDTOs && values.imageResponseDTOs.map((image, index) => (
                                                image.imageType === 'logo' && (
                                                    <div key={index} className="m-2 position-relative">
                                                        {
                                                            image.imageData === "" ?
                                                                <img
                                                                    src={`${process.env.REACT_APP_IMAGE_URL}${companyId}/${image.imageName}`}
                                                                    alt={image.imageName}
                                                                    style={{ width: '150px', height: '100px', objectFit: 'cover' }}
                                                                    onError={Onerrorimg}
                                                                    loading='lazy'
                                                                />
                                                                :
                                                                <img
                                                                    src={`data:image/png;base64,${image.imageData}`}
                                                                    alt={image.imageName}
                                                                    style={{ width: '100px', height: '100px' }}
                                                                    loading='lazy'
                                                                />
                                                        }

                                                        <span
                                                            className="position-absolute top-0 end-0 bg-danger rounded-circle text-white"
                                                            onClick={() => handleImageDelete(index)}
                                                        >
                                                            <i className='fa fa-multiply'></i>
                                                        </span>
                                                    </div>
                                                )
                                            ))}
                                        </div>
                                        <a href="#" className="imgholdingdiv c-primarycolor m-0" style={{ height: '33.5px' }} onClick={() => document.getElementById('upload_input_logo').click()}>
                                            Upload Logo Image Here
                                        </a>
                                    </div>
                                    <div className="col-md-12 imgdiv mb-3">
                                        <Form.Group>
                                            <Form.Label>Select Content Banner Image <span className='text-danger'>*</span></Form.Label>
                                            <Form.Control
                                                type="file"
                                                accept="image/*"
                                                id="upload_input_banner"
                                                className="d-none"
                                                ref={inputFileRefBanner}
                                                onChange={(e) => handleImageChange(e, inputFileRefBanner)}
                                            />
                                        </Form.Group>
                                        <div className="d-flex flex-wrap">
                                            {values.imageResponseDTOs && values.imageResponseDTOs.map((image, index) => (
                                                image.imageType === 'contentimage' && (
                                                    <div key={index} className="m-2 position-relative">
                                                        {
                                                            image.imageData == "" ?
                                                                <img
                                                                    src={`${process.env.REACT_APP_IMAGE_URL}${companyId}/${image.imageName}`}
                                                                    alt={image.imageName}
                                                                    style={{ width: '150px', height: '100px', objectFit: 'cover' }}
                                                                    onError={Onerrorimg}
                                                                    loading='lazy'
                                                                />
                                                                :
                                                                <img
                                                                    src={`data:image/png;base64,${image.imageData}`}
                                                                    alt={image.imageName}
                                                                    style={{ width: '100px', height: '100px' }}
                                                                    loading='lazy'
                                                                />
                                                        }
                                                        <span
                                                            className="position-absolute top-0 end-0 bg-danger rounded-circle text-white"
                                                            onClick={() => handleImageDelete(index)}
                                                        >
                                                            <i className='fa fa-multiply'></i>
                                                        </span>
                                                    </div>
                                                )
                                            ))}
                                        </div>
                                        <a href="#" className="imgholdingdiv c-primarycolor m-0" style={{ height: '33.5px' }} onClick={() => document.getElementById('upload_input_banner').click()}>
                                            Upload Logo Image Here
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="logintbn">
                                <button type="submit" className={`btn border border-secondarycolor rounded-pill px-3 c-secondarycolor ${isLoading ? 'loading' : ''}`} disabled={isLoading}>
                                    {isLoading ? (
                                        <div className="spinner-border c-primarycolor" role="status">
                                            <span className="visually-hidden">Saving Changes</span>
                                        </div>
                                    ) : (mode === 'add' ? 'Add Setting' : 'Update Setting')}
                                </button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
}
