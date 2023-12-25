'use client';
import React, {useEffect} from 'react';
import AllBlogComponent from '@/components/BlogComponent/AllBlogComponent/AllBlogComponent';
import communityApi from '@/api/community/apiCommunity';

type Props = {};

const page = (props: Props) => {
  const [communityUser, setCommunityUser] = React.useState<any>([]);
  const [bookmarked, setBookmarked] = React.useState(false);
  const [total, setTotal] = React.useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const resUser = await communityApi.getCommunityNews(
        '0',
        '10',
        'cm',
        0,
        'vi',
      );

      if (resUser && resUser.status === 200) {
        setCommunityUser(resUser.data.communications);
        setTotal(resUser.data.total);
      }
    };

    fetchData();
  }, [bookmarked]);

  const handleSetBookmark = async () => {
    setBookmarked(!bookmarked);
  };

  return (
    <div className="flex justify-center  relative">
      <div className="max-w-6xl w-full">
        <AllBlogComponent
          typeName={'see-all-admin'}
          data={communityUser}
          setBookmark={handleSetBookmark}
          total={total}
        />
      </div>
    </div>
  );
};

export default page;
