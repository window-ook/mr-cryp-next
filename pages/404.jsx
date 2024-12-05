import { DescriptionTypo } from '@/defaultTheme';
import React from 'react';

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="opacity-0">block</div>
      <DescriptionTypo>
        올바르지 않은 경로입니다. 다른 페이지로 이동해주세요.
      </DescriptionTypo>
    </div>
  );
}
