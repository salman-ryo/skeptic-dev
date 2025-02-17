import { useRouter } from 'next/navigation';

const useGoToPage = () => {
  const router = useRouter();

  const goto = (path: string) => {
    if (!path.startsWith('/')) {
      path = '/' + path;
    }
    router.push(path);
  };

  return { goto };
};

export default useGoToPage;
