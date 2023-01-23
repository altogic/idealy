import { Email } from '@/components/icons';
import Input from '@/components/Input';
import Label from '@/components/Label';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { ROLE } from 'constants';
import RoleListBox from './RoleListBox';

export default function InviteMemberForm() {
  const [roleSelected, setRoleSelected] = useState(ROLE[0]);
  const inviteSchema = new yup.ObjectSchema({
    email: yup.string().email().required('Email is required'),
    role: yup.string().required('Role is required')
  });
  const {
    register,
    formState: { errors },
    setValue
  } = useForm({
    resolver: yupResolver(inviteSchema),
    defaultValues: {
      role: roleSelected.name
    },
    mode: 'onBlur'
  });

  useEffect(() => {
    setValue('role', roleSelected.name);
  }, [roleSelected, setValue]);

  return (
    <form className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <Label label="Email address" htmlFor="emailAddress" />
          <Input
            type="text"
            name="email"
            id="email"
            placeholder="you@domain.com"
            register={register('email')}
            error={errors.email}
            icon={<Email className="w-5 h-5 text-slate-500" />}
          />
          <Input
            type="text"
            name="role"
            id="role"
            placeholder="you@domain.com"
            register={register('role')}
            error={errors.role}
            className="hidden"
          />
        </div>
        <div>
          <Label label="Role" />
          <RoleListBox roleSelected={roleSelected} setRoleSelected={setRoleSelected} />
        </div>
      </div>
    </form>
  );
}
