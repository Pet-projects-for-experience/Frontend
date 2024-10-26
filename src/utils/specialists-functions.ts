import { TProfession, TSkills } from "@/shared/types/specialty";
import { LEVEL } from "@/utils/constants";

export const transformProfessions = (profList: TProfession[]) => {
    return profList?.map(({ id, specialization }) => ({
        label: specialization,
        value: specialization,
        id,
    }));
};

export const getSkills = (skills: TSkills[]) => {
    return skills?.map(({ id, name }) => ({
        label: name,
        value: id,
    }));
};

export const getLevelName = (level: number) => {
    if (level > 0 && level < 5) {
        return LEVEL[level - 1].value;
    } else return '';
};
