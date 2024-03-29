import Avatar from '@/components/Avatar';
import Button from '@/components/Button';
import SectionTitle from '@/components/SectionTitle';
import { companyActions } from '@/redux/company/companySlice';
import { fileActions } from '@/redux/file/fileSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function CompanyFavicon() {
  const companyFaviconLink = useSelector((state) => state.file.faviconFile);
  const company = useSelector((state) => state.company.company);
  const loading = useSelector((state) => state.file.faviconLoading);
  const [file, setFile] = useState();
  const dispatch = useDispatch();

  const [didMount, setDidMount] = useState(false);

  const uploadFaviconHandler = (e) => {
    e.stopPropagation();
    const fileInput = document.createElement('input');

    fileInput.setAttribute('type', 'file');
    fileInput.setAttribute('accept', 'image/*');
    fileInput.click();

    fileInput.onchange = async () => {
      const file = fileInput.files[0];
      setFile(file);
      dispatch(
        fileActions.uploadFavicon({
          file,
          name: company?.name.replace(' ', '_').toLowerCase(),
          existingFile: company?.favicon
        })
      );
    };
  };

  const deleteFaviconHandler = () => {
    dispatch(fileActions.deleteCompanyFavicon(company._id));
  };

  useEffect(() => {
    if (didMount && companyFaviconLink) {
      dispatch(
        companyActions.updateCompany({
          _id: company._id,
          favicon: companyFaviconLink
        })
      );
    }
  }, [companyFaviconLink]);

  useEffect(() => {
    setDidMount(true);
  }, []);

  return (
    <>
      <div className="pb-4 mb-11 border-b border-slate-200 dark:border-aa-600 purple:border-pt-800">
        <SectionTitle
          sectionTitle="Company Favicon"
          sectionDescription="Update your company favicon."
        />
      </div>

      <div className="flex gap-6 mb-6">
        {company?.favicon && (
          <Avatar src={file ? URL.createObjectURL(file) : company.favicon} alt={company?.name} />
        )}
      </div>

      <div className="flex items-center gap-3">
        {company?.favicon ? (
          <Button onClick={deleteFaviconHandler} type="button" text="Delete" variant="red" />
        ) : null}
        <Button
          onClick={uploadFaviconHandler}
          type="button"
          text="Upload"
          variant="indigo"
          loading={loading}
        />
      </div>
    </>
  );
}
