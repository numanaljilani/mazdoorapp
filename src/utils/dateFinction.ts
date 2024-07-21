export   const formatedDateFunction = (milliseconds: any) => {

  const date1 = new Date(Number(milliseconds)).toLocaleDateString('en-US')

  return date1
};