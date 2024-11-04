import { GridElement } from './types';

type Props = {
    elements: GridElement[];
};

const Grid = ({ elements }: Props) => (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 lg:grid-cols-4">
        {elements.map(({ title, description, imagePath }, index) => (
            <div className="grid-element" key={`grid-element-${index}`}>
                <div className="relative pb-2/3">
                    <img
                        className="absolute h-full w-full object-cover"
                        src={imagePath}
                    />
                </div>
                <h3 className="font-bold">{title}</h3>
                <p>{description}</p>
            </div>
        ))}
    </div>
);

export default Grid;
