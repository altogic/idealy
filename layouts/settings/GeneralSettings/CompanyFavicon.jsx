import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fileActions } from '@/redux/file/fileSlice';
import { companyActions } from '@/redux/company/companySlice';
import { ClipLoader } from 'react-spinners';
import SectionTitle from '@/components/SectionTitle';
import Button from '@/components/Button';
import Avatar from '@/components/Avatar';

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
        companyActions.updateCompanyFaviconRequest({
          companyId: company._id,
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
      <div className="pb-4 mb-11 border-b border-slate-200">
        <SectionTitle
          sectionTitle="Company Favicon"
          sectionDescription="Update your company favicon."
        />
      </div>

      <div className="flex gap-6 mb-6">
        {loading ? (
          <div className="flex items-center justify-center">
            <ClipLoader loading={loading} color="#4338ca" size={30} />
          </div>
        ) : (
          company?.favicon && (
            <Avatar src={file ? URL.createObjectURL(file) : company.favicon} alt={company?.name} />
          )
        )}
      </div>

      <div className="flex items-center gap-3">
        {company?.favicon ? (
          <Button onClick={deleteFaviconHandler} type="button" text="Delete" variant="red" />
        ) : null}
        <Button onClick={uploadFaviconHandler} type="button" text="Upload" variant="indigo" />
      </div>
    </>
  );
}
