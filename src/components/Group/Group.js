import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "../../styles/Group/Group.css";
import GroupAdapter from "../../adapters/groupAdapter";
import SearchIcon from "@material-ui/icons/Search";
import GroupCard from "./GroupCard";
import AddGroup from "./AddGroup";
import { Link, useRouteMatch } from "react-router-dom";
import { Pagination } from "@material-ui/lab";

function Group() {
  let { url } = useRouteMatch();
  const { currentUser } = useAuth();
  const [groups, setGroups] = useState([]);
  const [groupsToShow, setgroupsToShow] = useState([]);
  const groupNameRef = useRef();
  const [page, setPage] = React.useState(1);
  const numberOfItemsForPage = 5;
  const totalPage =
    (groupsToShow.length + numberOfItemsForPage - 1) / numberOfItemsForPage;
  function getGroups() {
    GroupAdapter.getAllGroups(currentUser).then((data) => {
      setGroups(data.data.groups);
      setgroupsToShow(data.data.groups);
    });
  }
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  async function handle(e) {
    e.preventDefault();
  }
  const filter = (e) => {
    const keyword = e.target.value;

    if (keyword !== "") {
      const results = groups.filter((f) => {
        return f.groupName.toLowerCase().startsWith(keyword.toLowerCase());
      });
      setgroupsToShow(results);
    } else {
      setgroupsToShow(groups);
    }
  };
  useEffect(() => {
    getGroups();
  }, []);

  let addGroup = (childData) => {
    setGroups([...groups, childData]);
  };
  return (
    <div className="group">
      <h1 className="header">Groups</h1>
      <div className="searchBar">
        <div className="header__left">
          <SearchIcon />
          <form onSubmit={handle} onChange={filter}>
            <input
              placeholder="Searche for Groups"
              type="text"
              ref={groupNameRef}
            />
          </form>
        </div>
        <AddGroup addGroupCall={addGroup} />
      </div>
      <Pagination
        count={totalPage}
        page={page}
        onChange={handlePageChange}
        className="page"
      />
      <div className="pagedGroup">
        {groupsToShow
          ?.slice(
            (page - 1) * numberOfItemsForPage,
            page * numberOfItemsForPage - 1
          )
          ?.map((f) => (
            <Link to={`${url}/${f.groupId}`} style={{ textDecoration: "none" }}>
              <GroupCard key={f.groupId} groupName={f.groupName} />
            </Link>
          ))}
      </div>
    </div>
  );
}

export default Group;
