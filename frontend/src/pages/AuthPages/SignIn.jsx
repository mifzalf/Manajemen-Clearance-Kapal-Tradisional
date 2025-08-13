import React from 'react';
import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "../../components/layout/AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="Sign In | KSOP-K Arsip"
        description="Halaman Sign In untuk sistem arsip surat KSOP-K"
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}