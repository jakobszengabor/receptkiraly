import PropTypes from 'prop-types';

function Badge({ label }) {
  return (
    <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">#{label}</span>
  );
}

Badge.propTypes = {
  label: PropTypes.string.isRequired,
};

export default Badge;