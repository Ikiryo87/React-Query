import { useFetchTasks } from "./reactQueryCustomHooks";
import SingleItem from "./SingleItem";

const Items = () => {
  const { isPending, isError, data } = useFetchTasks();

  if (isPending) {
    return (
      <div>
        <h2>Loading data...</h2>
      </div>
    );
  }
  // console.log(data);

  if (isError) {
    return (
      <div>
        <p>There was an error...</p>
      </div>
    );
  }

  if (!data || !data.taskList) {
    return (
      <div>
        <h2>No data present...</h2>
      </div>
    );
  }

  return (
    <div className="items">
      {console.log(data)}
      {data.taskList.map((item) => {
        return <SingleItem key={item.id} item={item} />;
      })}
    </div>
  );
};
export default Items;
