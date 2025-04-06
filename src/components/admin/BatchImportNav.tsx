
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const BatchImportNav = () => {
  return (
    <div className="flex gap-4 mb-6">
      <Link to="/admin/articles">
        <Button variant="outline">Back to Articles</Button>
      </Link>
      <Link to="/admin/media">
        <Button variant="outline">Back to Media</Button>
      </Link>
    </div>
  );
};

export default BatchImportNav;
