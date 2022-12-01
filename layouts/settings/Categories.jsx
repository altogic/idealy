import { Fragment, useState, useEffect } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { companyActions } from '@/redux/company/companySlice';
import SectionTitle from '@/components/SectionTitle';
import Input from '@/components/Input';
import Button from '@/components/Button';
import SortableCompanyActions from '@/components/SortableCompanyActions';
import EmptyState from '@/components/EmptyState';

export default function Categories() {
  const colorPicker = '#37d67a';
  const createCategoriesNameSchema = new yup.ObjectSchema({
    categoriesName: yup.string().required('Categories name is required')
  });

  const dispatch = useDispatch();
  const error = useSelector((state) => state.company.companyCategoriesError);
  const loading = useSelector((state) => state.company.isLoading);
  const company = useSelector((state) => state.company.company);
  const [updateCategoriesLoading, setUpdateCategoriesLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(createCategoriesNameSchema)
  });

  useEffect(() => {
    if (Symbol.iterator in Object(error)) {
      error?.forEach((err) => {
        if (err.message?.includes('categories')) {
          setError('categories', {
            type: 'manuel',
            message: err.message
          });
        }
      });
    }
    if (!error) {
      reset();
    }
  }, [error, setError]);

  const formSubmit = (form) => {
    setUpdateCategoriesLoading(true);
    dispatch(
      companyActions.setCompanyCategories({
        name: form.categoriesName,
        color: colorPicker,
        companyId: company._id,
        order: company.categories.length + 1
      })
    );
    reset();
  };

  useEffect(() => {
    if (!loading) {
      setUpdateCategoriesLoading(false);
    }
  }, [loading]);
  return (
    <>
      <div className="pb-4 mb-11 border-b border-slate-200">
        <SectionTitle sectionTitle="Categories" sectionDescription="Organize your categories" big />
      </div>
      <div className="max-w-2xl">
        <div className="pb-6 mb-11 border-b border-slate-200">
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="grid grid-cols-[1fr,135px] gap-4">
              <Input
                type="text"
                name="categoriesName"
                id="categoriesName"
                register={register('categoriesName')}
                error={errors.categoriesName}
                placeholder="Enter category name"
              />
              <Button
                type="submit"
                loading={updateCategoriesLoading}
                text="Add Category"
                variant="indigo"
                height="44"
              />
            </div>
          </form>
        </div>
        <div>
          {company?.categories.length > 0 ? (
            <div>
              {company.categories.length && (
                <SortableCompanyActions
                  items={company?.categories}
                  property="categories"
                  onDelete={(item) =>
                    dispatch(
                      companyActions.removeCompanyCategories({
                        category: item._id
                      })
                    )
                  }
                />
              )}
            </div>
          ) : (
            <EmptyState
              title="No data found"
              description="You have not defined any categories yet. You can use categories to further group feedbacks."
            />
          )}
        </div>
      </div>
    </>
  );
}
