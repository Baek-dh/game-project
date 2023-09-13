package my.bdh.game.wf.model.service;

import java.util.List;

import my.bdh.game.wf.model.dto.Player;

public interface WhosFasterService {

	int insertRecord(Player player);

	List<Player> selectRank(String difficulty);
}
