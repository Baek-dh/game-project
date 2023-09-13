package my.bdh.game.wf.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import my.bdh.game.wf.model.dto.Player;

@Mapper
public interface WhosFasterMapper {

	int insertRecord(Player player);

	List<Player> selectRank(String difficulty);

}
