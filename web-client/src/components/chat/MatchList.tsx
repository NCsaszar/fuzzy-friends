import React, { useState, useEffect } from 'react';

interface MatchListProps {
  matches: Match[];
  tempMatches: TempMatch[];
  changeMate: (chat: string) => void;
}

const MatchList: React.FC<MatchListProps> = ({
  matches,
  tempMatches,
  changeMate,
}) => {
  const [currentUserSelected, setCurrentUserSelected] = useState(undefined);

  const [searchQuery, setSearchQuery] = useState('');
  const [tempData, setTempData] = useState([]);
  const [currentData, setCurrentData] = useState([]);

  useEffect(() => {
    // try {
    const copy = JSON.stringify(matches);
    setTempData(JSON.parse(copy));
    console.log(JSON.parse(copy), 'SETTING CURRENT DATA');
    setCurrentData(JSON.parse(copy));
    console.log(currentData, 'currentData');

    // } catch (err) {
    //   console.log('error here');
    // }
  }, [matches]);

  const doSearch = (event: React.FormEvent) => {
    event.preventDefault();
    handleSearch(searchQuery);
    setSearchQuery('');
  };

  const handleSearch = (query: string) => {
    const currentMatches = tempMatches.slice();
    const resultArr = [];
    for (let i = 0; i < currentMatches.length; i++) {
      if (
        currentMatches[i].name &&
        currentMatches[i].name.toLowerCase().includes(query.toLowerCase())
      ) {
        resultArr.push(currentMatches[i]);
      }
    }
    setCurrentData(resultArr);
  };

  const whileSearching = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    handleSearch(event.target.value);
    setSearchQuery(event.target.value);
  };

  return (
    // <div>
    <div className="m-10 h-[80vh] min-h-fit flex flex-col border shadow-md bg-white rounded-lg bg-white border border-gray-200 shadow-md dark:bg-warmGray-700 dark:border-gray- gap-2 content-center">
      <div className="flex items-center justify-between border-b p-5">
        <div className="flex items-center">
          <form onSubmit={doSearch}>
            <input
              type="search"
              id="default-search"
              className="block w-full p-2 pl-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-100"
              placeholder="Search for name..."
              value={searchQuery}
              onChange={whileSearching}
            />
          </form>
        </div>
      </div>

      <ul className="w-full overflow-auto h-[32rem]">
        <h2 className="my-2 mb-2 ml-2 text-lg text-gray-600">Chats</h2>
        <div className="matchList">
          {/* matches instead of data? */}
          {currentData.map((match, index) => {
            console.log('RENDERING MATCH', match);
            return (
              <div
                key={match._id}
                // className={`match ${
                //   index === currentUserSelected ? 'selected' : ''
                // }`}
                onClick={() => changeMate(match)}
              >
                <a className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">
                  <img
                    className="object-cover w-10 h-10 rounded-full"
                    src={match.pictures[0]}
                    alt=""
                  />
                  <div className="w-full pb-2">
                    <div className="flex justify-between">
                      <span className="block ml-2 font-semibold text-gray-600">
                        <h3>{match.name}</h3>
                      </span>
                      <span className="block ml-2 text-sm text-gray-600">
                        {/* <MatchListItem recentTime={data[match.id][1]} /> */}
                        {/* {console.log(data[match.id], '123')} */}
                      </span>
                    </div>
                    <span className="block ml-2 text-sm text-gray-600">
                      {/* <h3>{'Nm - wbu?'}</h3> */}
                    </span>
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </ul>
    </div>
    // </div>
  );
};

export default MatchList;
