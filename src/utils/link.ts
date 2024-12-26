import dynamicLinks from '@react-native-firebase/dynamic-links';

export const dynamicLink2 = async ({userId: id}: any) => {
  const link = await dynamicLinks().buildLink({
    link: `https://mazdoor.page.link/WorkDetails/ssid`,
    // domainUriPrefix is created in your Firebase console
    domainUriPrefix: 'https://mazdoor.page.link',
    android: {
      packageName: 'com.mazdoor.package',
    },
    // optional setup which updates Firebase analytics campaign
    // "banner". This also needs setting up before hand
  });
  console.log(link, 'LINK');

  return link;
};

export const dynamicLink = async ({userId}: any) => {
  try {
    const link = await dynamicLinks().buildShortLink({
      link: `https://mazdoor.page.link/Fu3N`,
      domainUriPrefix: 'https://mazdoor.page.link',
      android: {
        packageName: 'com.mazdoor.package',
      },
    });
    console.log('link:', link);
    return link;
  } catch (error) {
    console.log(error , ">>>>");
    
  }
};
