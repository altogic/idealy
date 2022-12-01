import Input from '@/components/Input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { companyActions } from '@/redux/company/companySlice';
import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { SUBDOMAIN_REGEX } from 'constants';
import { CircleCheck, XCircle } from '@/components/icons';

export default function FirstWizard() {
  const dispatch = useDispatch();

  const schema = yup.object().shape({
    companyName: yup.string().required('Company name is required'),
    subdomain: yup
      .string()
      .matches(
        SUBDOMAIN_REGEX,
        'Subdomain can only contain lowercase letters and numbers and must be between 3 and 20 characters long'
      )
      .required('Subdomain is required')
  });
  const [inpSubdomain, setInpSubdomain] = useState();
  const companyWillBeCreated = useSelector((state) => state.company.companyWillBeCreated);
  const subdomain = useSelector((state) => state.company.subdomain);
  const isCompanyNameExists = useSelector((state) => state.company.isCompanyNameExists);
  const isSubdomainExists = useSelector((state) => state.company.isSubdomainExists);
  const subdomainLoading = useSelector((state) => state.company.subdomainLoading);
  const error = useSelector((state) => state.company.error);
  const {
    register,
    formState: { errors },
    setValue,
    setError,
    clearErrors
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur'
  });
  const handleNameChange = (e) => {
    clearErrors('companyName');
    dispatch(companyActions.setCompanyWillBeCreated(e.target.value));
  };
  const handleSubdomainChange = (subdomain) => {
    dispatch(companyActions.setSubdomain(subdomain));
  };
  const debouncedNameChange = useCallback(debounce(handleNameChange, 500), []);
  const checkSubdomain = (e) => {
    setInpSubdomain(e.target.value);
  };
  useEffect(() => {
    let timer;
    if (inpSubdomain) {
      timer = setTimeout(() => {
        if (SUBDOMAIN_REGEX.test(inpSubdomain)) {
          clearErrors('subdomain');
          handleSubdomainChange(inpSubdomain);
        } else {
          setError('subdomain', {
            type: 'manual',
            message:
              'Subdomain can only contain lowercase letters, numbers - , _ and must be between 3 and 20 characters long'
          });
        }
      }, 500);
    }
    return () => clearTimeout(timer);
  }, [inpSubdomain]);

  useEffect(() => {
    if (companyWillBeCreated) {
      setValue('companyName', companyWillBeCreated);
    }
    if (subdomain) {
      setValue('subdomain', subdomain);
    }
  }, [companyWillBeCreated, subdomain]);
  useEffect(() => {
    if (Symbol.iterator in Object(error)) {
      error.forEach((err) => {
        setError(err.field, {
          type: 'manual',
          message: err.message
        });
      });
    }
  }, [error]);
  useEffect(() => {
    if (isCompanyNameExists) {
      setError('companyName', {
        type: 'manual',
        message: 'Company name already exists'
      });
    }
  }, [isCompanyNameExists]);

  return (
    <>
      <div className="max-w-[444px] mx-auto mb-16 text-center">
        <h2 className="text-slate-700 mb-4 text-3xl font-semibold tracking-md">
          Welcome to {process.env.appName}
        </h2>
        <p className="text-slate-500 text-lg tracking-sm">
          Let &apos; s start by setting up your company.
        </p>
      </div>
      <div className="max-h-[200px] mx-auto mb-4">
        <div className="mt-4">
          <Input
            name="companyName"
            id="companyName"
            placeholder="Company name"
            label="Company name"
            register={register('companyName')}
            error={errors.companyName}
            onChange={debouncedNameChange}
          />
        </div>
        <div className="mt-4 pb-4">
          <Input
            name="subdomain"
            id="subdomain"
            placeholder="Subdomain"
            label="Subdomain"
            postfix={process.env.url}
            register={register('subdomain')}
            error={errors.subdomain}
            onKeyUp={checkSubdomain}
          />
          <div className="space-y-4">
            {subdomainLoading && (
              <div className="flex items-center text-slate-500 text-sm mt-2">
                <ClipLoader loading={subdomainLoading} size={15} color="#4B5563" />{' '}
                <span className="ml-2">Checking subdomain...</span>
              </div>
            )}
            {!isSubdomainExists &&
              !subdomainLoading &&
              subdomain &&
              !errors.subdomain &&
              inpSubdomain && (
                <div className="flex items-center text-sm mt-2 text-green-500">
                  <span className="mr-1">
                    <CircleCheck className="w-4 h-4" />
                  </span>
                  <span>Subdomain is available</span>
                </div>
              )}
            {isSubdomainExists && !subdomainLoading && !errors.subdomain && inpSubdomain && (
              <div className="flex items-center text-sm mt-2 text-red-500">
                <span className="mr-1">
                  <XCircle className="w-4 h-4" />
                </span>
                <span>Subdomain already exist</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
