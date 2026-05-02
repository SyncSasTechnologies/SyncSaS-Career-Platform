import GigCard from "./GigCard";

const GigList = ({ gigs }) => {
  if (gigs.length === 0) {
    return <p>No gigs found.</p>;
  }

  return gigs.map((gig) => <GigCard key={gig.id} gig={gig} />);
};

export default GigList;
