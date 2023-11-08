import Skeleton from "@/app/components/Skeleton";
import { Box } from "@radix-ui/themes";

const LoadinNewIssuePage = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton></Skeleton>
      <Skeleton height="20rem"></Skeleton>
    </Box>
  );
};

export default LoadinNewIssuePage;
