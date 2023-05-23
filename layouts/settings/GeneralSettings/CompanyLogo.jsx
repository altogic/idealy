import Button from '@/components/Button';
import CompanyAvatar from '@/components/CompanyAvatar';
import SectionTitle from '@/components/SectionTitle';
import { companyActions } from '@/redux/company/companySlice';
import { fileActions } from '@/redux/file/fileSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function CompanyLogo() {
  const companyLogoLink = useSelector((state) => state.file.fileLink);
  const company = useSelector((state) => state.company.company);
  const loading = useSelector((state) => state.file.isLoading);
  const loadingCompany = useSelector((state) => state.company.logoLoading);
  const dispatch = useDispatch();

  const [didMount, setDidMount] = useState(false);
  const [logoUrl, setLogoUrl] = useState();

  const uploadPhotoHandler = (e) => {
    e.stopPropagation();
    const fileInput = document.createElement('input');

    fileInput.setAttribute('type', 'file');
    fileInput.setAttribute('accept', 'image/*');
    fileInput.click();

    fileInput.onchange = async () => {
      const file = fileInput.files[0];
      setLogoUrl(URL.createObjectURL(file));
      dispatch(
        fileActions.uploadFileRequest({
          file,
          name: company?.name.replace(' ', '_').toLowerCase(),
          existingFile: company?.logoUrl
        })
      );
    };
  };

  const deletePhotoHandler = () => {
    setLogoUrl(null);
    dispatch(fileActions.deleteCompanyLogo(company._id));
  };

  useEffect(() => {
    if (didMount && companyLogoLink) {
      dispatch(
        companyActions.updateCompany({
          _id: company._id,
          logoUrl: companyLogoLink
        })
      );
    }
  }, [companyLogoLink]);

  useEffect(() => {
    if (company?.logoUrl) dispatch(fileActions.clearFileLink());
  }, [company?.logoUrl]);

  useEffect(() => {
    setDidMount(true);
  }, []);

  return (
    <>
      <div className="pb-4 mb-11 border-b border-slate-200 dark:border-aa-600 purple:border-pt-800">
        <SectionTitle sectionTitle="Company Logo" sectionDescription="Update your company logo." />
      </div>

      <div className="flex gap-6 mb-6">
        <CompanyAvatar
          logoUrl={logoUrl || company.logoUrl}
          name={company?.name}
          className="w-11 h-11 text-xl"
        />
      </div>

      <div className="flex items-center gap-3">
        {company?.logoUrl && (
          <Button onClick={deletePhotoHandler} type="button" text="Delete" variant="red" />
        )}
        <Button
          onClick={uploadPhotoHandler}
          type="button"
          text="Upload"
          variant="indigo"
          loading={loading || loadingCompany}
        />
      </div>
    </>
  );
}
