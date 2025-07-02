export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/swap',
      permanent: false, // set to true if it's a permanent redirect (SEO)
    },
  }
}

export default function Index() {
  return null
}
