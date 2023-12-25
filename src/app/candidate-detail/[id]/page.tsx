/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import React, {useEffect, useState} from 'react';
import InfoPerson from '@/components/ProfileComponent/InfoPerson/InfoPerson';
import JobProfile from '@/components/ProfileComponent/JobProfile/JobProfile';
import EducationProfile from '@/components/ProfileComponent/EducationProfile/EducationProfile';
import ExperienceProfile from '@/components/ProfileComponent/ExperienceProfile/ExperienceProfile';
import AchivementProfile from '@/components/ProfileComponent/AchivementProfile/AchivementProfile';
import ContactProfile from '@/components/ProfileComponent/ContactProfile/ContactProfile';
import SkillProfile from '@/components/ProfileComponent/SkillProfile/SkillProfile';
import LanguageProfile from '@/components/ProfileComponent/LanguageProfile/LanguageProfile';
import AvatarProfile from '@/components/ProfileComponent/AvatarProfile/AvatarProfile';
import NameProfile from '@/components/ProfileComponent/NameProfile/NameProfile';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProfile} from '@/redux/reducer/profileReducer/profileSlice';
import profileAPi from '@/api/profiles/profileApi';
import {useParams} from 'next/navigation';
import {SaveIconFill, SaveIconOutline} from '@/icons';
import candidateSearch from '@/api/candidate/apiCandidates';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CvProfile from '@/components/ProfileComponent/CvProfile/CvProfile';

type Props = {};

interface IBookmark {
  status: number;
  message: string;
}

const page = (props: Props) => {
  const dispatch = useDispatch();
  const [dataInfo, setDataInfo] = useState<any>();
  const [dataProfile, setDataProfile] = useState<any>({});
  const [resizePage, setResizePage] = useState<boolean>(false);
  const useSearchParams = useParams();
  const accountId = localStorage.getItem('accountId');

  useEffect(() => {
    const fetchData = async () => {
      const res = await profileAPi.getProfileByAccountId(
        'vi',
        useSearchParams.id as string,
      );

      if (res && res.status === 200) {
        setDataProfile(res.data);
      }
    };

    fetchData();
  }, []);

  const handleUpdateApi = () => {
    dispatch(fetchProfile('vi') as any);
  };
  useEffect(() => {
    setDataInfo({
      ...dataProfile,
      address: dataProfile?.addressText?.id,
      categoryIds: dataProfile?.profileCategories?.map((dt: any) => {
        return dt.id;
      }),
      locationIds: dataProfile?.profileLocations?.map((dt: any) => {
        return dt.id;
      }),
      profilesSkills: dataProfile?.profilesSkills?.map((dt: any) => {
        return {
          id: dt?.id,
          skillName: dt?.skillName,
          skillLevelId: dt?.dataLevel?.id,
        };
      }),
      profilesLanguages: dataProfile?.profilesLanguages?.map((dt: any) => {
        return {
          id: dt?.id,
          languageName: dt?.languageName,
          languageLevelId: dt?.dataLevel?.id,
        };
      }),
    });
  }, [dataProfile]);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1152) {
        setResizePage(true);
      } else {
        setResizePage(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleBookmarked = (id: number) => {
    try {
      const fetchData = async () => {
        const res = (await candidateSearch.postBookmarkCandidate(
          useSearchParams.id as string,
        )) as unknown as IBookmark;

        if (res && res.status === 201) {
          toast.success('Save candidate success', {
            position: 'bottom-center',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
          });

          setDataProfile({...dataProfile, isBookmarked: true});
        }
      };

      fetchData();
    } catch (error) {
      toast.error('You cannot bookmark your own post', {
        position: 'bottom-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
  };

  const handleDeleteBookmarked = (id: number) => {
    try {
      const fetchData = async () => {
        const res = (await candidateSearch.postBookmarkCandidate(
          useSearchParams.id as string,
        )) as unknown as IBookmark;

        if (res && res.status === 200) {
          toast.success('Unsave candidate success', {
            position: 'bottom-center',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
          });

          setDataProfile({...dataProfile, isBookmarked: false});
        }
      };

      fetchData();
    } catch (error) {
      toast.error('You cannot delete your own post', {
        position: 'bottom-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
  };

  return (
    <div>
      <div className="flex justify-center">
        <div className="max-w-6xl w-full flex flex-col items-center py-16">
          <AvatarProfile
            dataInfo={dataInfo}
            handleUpdateApi={handleUpdateApi}
            checkUpdate={true}
          />
          <NameProfile
            dataInfo={dataInfo}
            handleUpdateApi={handleUpdateApi}
            checkUpdate={true}
          />
          <div
            className="mb-10 w-12 h-12 flex justify-center items-center"
            style={{
              border: '1px solid gray',
              borderRadius: '50%',
              cursor: 'pointer',
            }}
            onClick={() => {
              if (dataProfile.isBookmarked === false) {
                handleBookmarked(dataProfile.accountId);
              } else {
                handleDeleteBookmarked(dataProfile.accountId);
              }
            }}
          >
            {dataProfile.accountId !== accountId &&
              (dataProfile.isBookmarked === true ? (
                <SaveIconFill width={24} height={24} />
              ) : (
                <SaveIconOutline width={24} height={24} />
              ))}
          </div>
          <div className={`flex w-full ${resizePage ? 'flex-wrap px-16' : ''}`}>
            <div
              className={` ${resizePage ? 'min-w-full' : 'mr-9 basis-8/12'}`}
            >
              <InfoPerson
                dataInfo={dataInfo}
                handleUpdateApi={handleUpdateApi}
                checkUpdate={true}
              />
              <JobProfile
                dataInfo={dataInfo}
                handleUpdateApi={handleUpdateApi}
                checkUpdate={true}
              />
              <EducationProfile
                dataInfo={dataInfo}
                handleUpdateApi={handleUpdateApi}
                checkUpdate={true}
              />
              <ExperienceProfile
                dataInfo={dataInfo}
                handleUpdateApi={handleUpdateApi}
                checkUpdate={true}
              />
              <AchivementProfile
                dataInfo={dataInfo}
                handleUpdateApi={handleUpdateApi}
                checkUpdate={true}
              />
              <CvProfile profile={dataProfile} />
            </div>

            <div className={` ${resizePage ? 'min-w-full' : 'basis-4/12'}`}>
              <ContactProfile
                dataInfo={dataInfo}
                handleUpdateApi={handleUpdateApi}
                checkUpdate={true}
              />
              <SkillProfile
                dataInfo={dataInfo}
                handleUpdateApi={handleUpdateApi}
                checkUpdate={true}
              />
              <LanguageProfile
                dataInfo={dataInfo}
                handleUpdateApi={handleUpdateApi}
                checkUpdate={true}
              />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default page;
